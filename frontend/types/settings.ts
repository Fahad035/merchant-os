export interface Settings {
  merchant_name: string;
  email: string;
  phone: string;
  gst_number: string;

  store_name: string;
  industry: string;
  address: string;
  currency: string;
  timezone: string;

  ai_recommendations: boolean;
  auto_bundle_detection: boolean;
  campaign_suggestions: boolean;
  checkout_ai: boolean;
  planner_agent: boolean;

  email_notifications: boolean;
  sms_notifications: boolean;
  browser_notifications: boolean;

  theme: string;
  compact_mode: boolean;
  animations: boolean;

  two_factor_auth: boolean;
  session_timeout: number;
  api_key: string;
}