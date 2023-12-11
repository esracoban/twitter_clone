import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithRedirect, signInWithPopup
  } from 'firebase/auth';
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Auth = () => {
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState ('');
    const [isError, setİsError] = useState(false);
    const navigate = useNavigate();

    // form gönderildiğinde
    const handleSubmit = (e) => {
        e.preventDefault();
    
    const mail = e.target[0].value;
    setEmail(mail);
    const pass = e.target[1].value;

        if(signUp) {
            // hessap oluştur
            createUserWithEmailAndPassword(auth, mail, pass)
            .then(() => {
                navigate("/feed")
                toast.success("Hesabınız Oluşturuldu");
            })
            .catch((err)=>{
                console.log(err);
                toast.error(`Üzgünüz bir hata oluştu : ${err.code}`);
            })
        }
        else {
            // giriş yap
            signInWithEmailAndPassword(auth, mail, pass)
            .then(() => {
                navigate("/feed")
                toast.success("Hesabınıza Giriş Yapıldı ");
            })
            .catch((err)=>{
                if(err.code === 'auth/invalid-login-credentials'){
                    setİsError(true);
                }
                toast.error(`Üzgünüz bir hata oluştu : ${err.code}`);
            })
        }
    };

    // şifre sıfırlama
const handlePassReset = () => {
    sendPasswordResetEmail(auth, email).then(() =>
    toast.info('Mailinize sıfırlama isteği gönderildi')
    );

};

// google ile giriş yap

const handleGoogle = () =>{
    signInWithPopup(auth,googleProvider).then(() =>{
        navigate('/feed');
        toast.success('Google hesabınız ile giriş yapıldı');
    });
};

  return (
   <section className="h-screen bg-zinc-800 grid place-items-center">
    <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
       
        <div className="flex justify-center">
            <img className="h-[60px]" src="/xlogo.png"/>
        </div>

        <h1 className="text-center font-bold text-lg">X'e Giriş Yap</h1>

        <div onClick={handleGoogle} className="flex items-center bg-white py-2 px-10 rounded-full cursor-pointer gap-3 hover:bg-gray-300">
            <img className="h-[20px]" src="/google.png"/>
            <span className="text-black">Google ile {signUp ? 'kaydol' : 'giriş yap'}</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>E-mail</label>
            <input className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]" type="email" />

            <label className="mt-5">Şifre</label>
            <input className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]" type="password" />

            <button className="bg-white text-black mt-9 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {signUp ? 'Kaydol' : 'Giriş Yap'}
        </button>
        </form>

        

        <p className="mt-5">
            <span className="text-gray-500 me-2">
               {signUp ? 'Hesabınız varsa' : 'Hesabınız yoksa'}
            </span>
            <span onClick={() => setSignUp(!signUp)} className='cursor-pointer text-blue-500'>
                {signUp ? 'Giriş Yap' : 'Kaydol'}
            </span>
        </p>

        {/* hata varsa */}
        {
            isError && !signUp && <p onClick={handlePassReset} className="text-red-400 cursor-pointer">Şifrenizi mi  Unuttunuz?</p>
        }

    </div>
   </section>
  )
}

export default Auth
