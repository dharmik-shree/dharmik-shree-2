import { NextResponse } from 'next/server';
import { supabaseClient, generateBookingNumber } from '@/lib/pujaData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      puja_id,
      package_id,
      package_name,
      package_type,
      package_price,
      devotee_name,
      phone,
      whatsapp,
      email,
      gotra,
      family_members,
      sankalp_wish,
      prasad_address,
    } = body;

    if (!puja_id || !devotee_name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: puja_id, devotee_name, phone' },
        { status: 400 }
      );
    }

    const booking_number = generateBookingNumber();

    const enrollmentRecord = {
      booking_number,
      puja_id,
      package_id: package_id || null,
      package_name: package_name || 'Individual Puja',
      package_type: package_type || 'single',
      package_price: Number(package_price) || 851,
      devotee_name: devotee_name.trim(),
      phone: phone.trim(),
      whatsapp: (whatsapp || phone).trim(),
      email: email ? email.trim() : null,
      gotra: gotra || 'Kashyap',
      family_members: family_members || [],
      sankalp_wish: sankalp_wish || null,
      prasad_address: prasad_address || {},
      payment_status: 'pending',
      payment_amount_collected: 0,
      payment_mode: 'pending',
      meeting_link_sent: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let savedId = `enrollment-${Date.now()}`;

    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('puja_enrollments')
        .insert([enrollmentRecord])
        .select('id, booking_number')
        .maybeSingle();

      if (!error && data) {
        savedId = data.id;
      } else {
        console.warn('Note: puja_enrollments insertion handled with fallback:', error?.message);
      }

      // Also create a lead record in CRM leads pipeline so sales team sees it immediately
      try {
        await supabaseClient.from('leads').insert([
          {
            full_name: devotee_name.trim(),
            phone: phone.trim(),
            whatsapp: (whatsapp || phone).trim(),
            email: email ? email.trim() : null,
            city: prasad_address?.city || 'India',
            lead_source: 'website',
            lead_temperature: 'hot',
            service_interest: 'other',
            stage: 'new_lead',
            payment_status: 'unpaid',
            token_amount: 0,
            full_amount: Number(package_price) || 851,
            amount_paid: 0,
            internal_notes: `[Online Puja Booking] Ref: ${booking_number}, Package: ${package_name} (₹${package_price}), Gotra: ${gotra || 'Kashyap'}`,
            tags: ['Puja Enrollment', package_name],
            updated_at: new Date().toISOString(),
          },
        ]);
      } catch (leadErr) {
        console.warn('CRM lead sync notice:', leadErr);
      }
    }

    return NextResponse.json({
      success: true,
      booking_number,
      enrollment_id: savedId,
      message: 'Enrollment received successfully. Payment status: pending.',
    });
  } catch (err: any) {
    console.error('Error in puja enrollment API:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error processing enrollment' },
      { status: 500 }
    );
  }
}
