import { useEffect, useState } from "react"
import TweetForm from "./TweetForm"
import { collection, doc, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import Post from "./Post"


const Main = () => {
const [tweets, setTweets] = useState([]);
const tweetCol = collection(db, 'tweets');


  useEffect(() => {

    // tweet sıralama
    const queryOptions = query(tweetCol, orderBy('createdAt', 'desc'));

    onSnapshot(queryOptions, (snapshot) => {
      const tempTweets = [];
      snapshot.forEach((doc) => 
        tempTweets.push({...doc.data(), id: doc.id})
      );
      setTweets(tempTweets);
    });
  }, []);


  return (
    <main className="main col-span-3 md:col-span-2 xl:col-span-1 border border-gray-800 overflow-y-auto">
        <header className="fontt-bold p-4 border-b-2 border-gray-800">Anasayfa</header>
        <TweetForm/>

        {/* loading */}
        {!tweets && (
  <p className="text-center mt-[200px]">Yükleniyor..</p>
)}

        {/* tweetleri listeleme */}
        {tweets?.map((tweet) => (
          <Post key={tweet.id} tweet={tweet}/>
        ))}
    </main>
  )
}

export default Main
