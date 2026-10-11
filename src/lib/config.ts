// APIのURL。今はMSWが横取りするローカルのURL、
// AWS完成後は .env.local でAPI GatewayのURLに差し替える
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";