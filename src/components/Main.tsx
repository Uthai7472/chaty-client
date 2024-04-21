
import './Main.css'
import Header from './Header';
import useAuth from './AuthGuard';
import ChatBar from './ChatBar';
import MyChatBlock from './MyChatBlock';


const Main = () => {

  const isAuthen = useAuth();

  if (!isAuthen) {
    return null;
  }

  let userLogin = localStorage.getItem('userLogin');
  console.log(localStorage.getItem('userLogin'));

  return (
    <div className='main-body'>
      <Header topic={userLogin} />
      {/* <Navbar /> */}

      {/* <YourChatBlock /> */}
      <MyChatBlock />

      <ChatBar />
    </div>
  )
}

export default Main