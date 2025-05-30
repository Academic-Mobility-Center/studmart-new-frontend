export const sendEmail = async(name: string, body: string, from: string) => {
    try{
      const response = await fetch(`/api/email/SupportRequest`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "accept": "*/*"
         },
        body: JSON.stringify({
          name,
          body,
          from
        })
      })
      if (!response.ok) {
        console.log(`Ошибка при отправлении письма: ${response.status}`);
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : { status: response.status };
      
      return data;
    } catch (error) {
      console.log(error)
      return null;
    }
  }