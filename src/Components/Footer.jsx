import { BsDiscord,  BsLinkedin, BsTwitter} from 'react-icons/bs';

function Footer(){
  
    const currentDate = new Date();
    const Year = currentDate.getFullYear();

    return(
       <>
       <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20 rounded-3xl'>
         <section>
            Copyright {Year} | All rights reserved
         </section>
        <section className='flex items-center justify-center gap-5 text-2xl text-white'>
            

            <a
             href="https://discord.com/channels/@me"
               target="_blank" rel="noopener noreferrer"
            
            className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsDiscord/>
            </a>

            <a 
              href="https://www.linkedin.com/in/shivanshu-singh-646b91232"
               target="_blank" rel="noopener noreferrer"
            className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                
                <BsLinkedin/>
            </a>

            <a 
              href="https://x.com/ShivanshuRag"
               target="_blank" rel="noopener noreferrer"
            className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsTwitter/>
            </a>


        </section>

       </footer>
       </>

    )

 }

 export default Footer;