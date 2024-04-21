
import './Main.css'
import Header from './Header';
// import useAuth from './AuthGuard';
import ChatBar from './ChatBar';
import MyChatBlock from './MyChatBlock';
import useAuth from './AuthGuard';


const Main = () => {

  const isAuthen = useAuth();

  if (!isAuthen) {
    return null;
  }

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, []);
  // const isAuthenState = localStorage.getItem('isAuthenticated');
  //   if (isAuthenState === 'false' || isAuthenState === null) {
  //     window.location.href = '/';
  //     return null;
  //     // window.location.href = '/';
  //   }
  
  //   console.log('isAuthen: ', localStorage.getItem('isAuthenticated'));

  let userLogin = localStorage.getItem('userLogin');
  console.log(localStorage.getItem('userLogin'));

  return (
    <div className='main-body'>
      <Header topic={userLogin ?? ''} />
      {/* <Navbar /> */}

      {/* <YourChatBlock /> */}
      <MyChatBlock />

      <ChatBar />
    </div>
  )
}

export default Main