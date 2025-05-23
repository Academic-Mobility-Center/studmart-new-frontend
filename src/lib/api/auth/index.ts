// services/auth.ts
export async function loginUser(formData: {
    email: string;
    password: string;
    twoFactorCode: string;
    twoFactorRecoveryCode: string;
  }): Promise<{ token?: string; error?: string }> {
    try {
      const response = await fetch('/api/auth/login?useCookies=false', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      return {
        token: response.ok ? data.token : undefined,
        error: response.ok ? undefined : data.error || 'Ошибка авторизации',
      };
    } catch (error) {
      console.error(error);
      return { error: 'Ошибка соединения' };
    }
  }

  export async function loginWithCookie(formData: {
    email: string;
    password: string;
    twoFactorCode: string;
    twoFactorRecoveryCode: string;
  }): Promise<{ token?: string; error?: string }> {
    try {
        const response = await fetch('/api/auth/login?useCookies=true', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        return {
          token: response.ok ? data.token : undefined,
          error: response.ok ? undefined : data.error || 'Ошибка авторизации',
        };
      } catch (error) {
        console.error(error);
        return { error: 'Ошибка соединения' };
      }
  }
  