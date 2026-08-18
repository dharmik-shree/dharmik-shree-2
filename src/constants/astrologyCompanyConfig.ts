export interface AstrologyCompanyConfig {
  logo_url: string;
  domain_url: string;
  chart_style: string;
  footer_link: string;
  company_info: string;
  company_name: string;
  pdf_api_name: string;
  pdf_endpoint: string;
  company_email: string;
}

export const ASTROLOGY_COMPANY_CONFIG: AstrologyCompanyConfig = {
  logo_url: "https://neytabykygedayelyhvi.supabase.co/storage/v1/object/public/logo/ds_logo_500.png",
  domain_url: "https://dharmikshree.com/",
  chart_style: "NORTH_INDIAN",
  footer_link: "https://dharmikshree.com/",
  company_info: "DharmikShree 13th Gen Astrologer and Vastu Consultant ",
  company_name: "DhamirkShree",
  pdf_api_name: "basic_horoscope_pdf",
  pdf_endpoint: "basic_horoscope_pdf",
  company_email: "dharmikshree.connect@gmail.com",
};
