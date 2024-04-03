import axios from "axios";



const generateToken = async(req, res) =>{
  try {
    const headers ={
      username: "sandboxTokenizedUser02",
      password: "sandboxTokenizedUser02@12345",
      "Content-Type":"application/json",
      accept: 'application/json'
    };

    const url =`https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant`

    const data = {
      app_key:  '4f6o0cjiki2rfm34kfdadl1eqq',
      app_secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b',
    }


    const  ddaa = JSON.stringify(data);
    const response = await axios.post(url, {headers}, ddaa);
    console.log(response)

    if (response.data.status === 'fail') {
      throw new Error('Invalid API Credentials Provided');
    }

    return response.data
  } catch (error) {
    throw new Error('An error occurred while fetching the token');
  }

}


export const bkashService = {
  generateToken,
}