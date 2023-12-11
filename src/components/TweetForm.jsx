import React from 'react'
import { auth, db, storage } from './../firebase/config';
import {BsCardImage} from 'react-icons/bs';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';



const TweetForm = () => {

  // koleksiyonu referans alma
  const tweetsCol = collection(db, 'tweets');

  // fotoğrafı storagea yükler ve urlini döndürür

  const uploadImage = async (image) => {
    // gönderilen dosyayı kontrol etme
    if(!image) {
      return null;
    }
    // fotoğrafın storagedaki yerini ayarlama
    const storageRef = ref(storage, `${new Date().getTime()}${image.name}`);


  // fotografı ayarladığımı< konuma gönderme
  const url = await uploadBytes(storageRef, image)
  // yüklenme bittiğinde resmin urini alma
  .then((res) =>
    getDownloadURL(res.ref))
  .catch(() => toast.error('fotoğraf yüklenirken bir hata oluştu'));
 
  // fonskiyonun çaağrıldığı yere url gönderme
  return url;
};
  // formun gönderilmesi
  const handleSubmit = async(e) => {
    e.preventDefault();

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

   const url = await uploadImage(imageContent);
    
    if(!textContent) {
      toast.info('Tweet içeriği ekleyin..');
      return;
    }

    // tweeti koleksiyona ekleme
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        user: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
        likes: [],
      });

      // inputları sıfırlama
      e.target[0].value = '';
      e.target[1].value = null;
  };
  return (
    <form onSubmit={handleSubmit} className='flex gap-3 p-4 border-b-2 border-b-gray-800'>
        <img className='rounded-full h-[50px]' src={auth.currentUser?.photoURL} />

        <div className='w-full'>
            <input placeholder='Neler Oluyor?' className='w-full  bg-transparent my-2 outline-none placeholder:text-lg' type="text" />
            <div  className='flex justify-between'> 
                <div className='hover:bg-gray-800 transition p-4 cursor-pointer rounded-full'>
                    <label htmlFor="picture">
                    <BsCardImage/>
                    </label>
                <input className='hidden' id="picture" type="file" />
                </div>
                <button className='bg-blue-600 px-4 py-1 rounded-full transition hover:bg-blue-500'>Tweetle</button>
            </div>
        </div>
    
    </form>
  );
};

export default TweetForm;
