const API = process.env.NEXT_PUBLIC_LINK_API_URL_BASE

export const apiConfig = {
  auth: {
    register: `${API}/user/register`,
    login: `${API}/auth/login`
  }
}