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

  // export async function loginWithCookie(formData: {
  //   email: string;
  //   password: string;
  //   twoFactorCode: string;
  //   twoFactorRecoveryCode: string;
  // }): Promise<{ token?: string; error?: string; role?: string; id?: string }> {
  //   try {
  //       const response = await fetch('/api/auth/login?useCookies=true', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         credentials: 'include',
  //         body: JSON.stringify(formData),
  //       });
    
  //       const data = await response.json();
  //       return {
  //         token: response.ok ? data.token : undefined,
  //         role: data.role ? data.role : undefined,
  //         id: data.id ? data.id : undefined,
  //         error: response.ok ? undefined : data.error || 'Ошибка авторизации',
  //       };
  //     } catch (error) {
  //       console.error(error);
  //       return { error: 'Ошибка соединения' };
  //     }
  // }
  export async function loginWithCookie(formData: {
    email: string;
    password: string;
    twoFactorCode: string;
    twoFactorRecoveryCode: string;
  }): Promise<{ token?: string; role?: string; id?: string; error?: string }> {
    try {
      const response = await fetch('/api/auth/login?useCookies=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      return {
        token: data.token,
        role: data.role,
        id: data.id,
        error: response.ok ? undefined : data.error || 'Ошибка авторизации',
      };
    } catch (error) {
      console.error(error);
      return { error: 'Ошибка соединения' };
    }
  }
  export async function forgotPassword(email: string) {
    try {
      const response = await fetch('/api/auth/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }), // Обернуто в объект
      });
  
      if (response.status === 204) {
        return { status: 204 }; // Успех
      }
  
      // Пытаемся достать сообщение об ошибке, если оно есть
      let errorMessage = 'Ошибка запроса';
      try {
        const data = await response.json();
        errorMessage = data?.error || errorMessage;
      } catch {
        // Игнорируем, если тело пустое или не JSON
      }
  
      return { status: 400, error: errorMessage };
    } catch (error) {
      console.error(error);
      return { status: 400, error: 'Ошибка соединения' };
    }
  }
  
  export async function resetPassword(email: string, resetCode: string, newPassword: string){
    try {
      const response = await fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, resetCode, newPassword }), // Обернуто в объект
      });
      if (response.status === 204) {
        return { status: 204 };
    }

    const data = await response.json().catch(() => ({}));
    return {
      status: response.status,
      error: data?.message || "Неизвестная ошибка",
    };
  } catch (error) {
    console.warn(error)
    return {
      status: 500,
      error: "Сетевая ошибка или ошибка сервера",
    };
  }
  }