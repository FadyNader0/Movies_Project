import Logo_Img from '../../assets/logo.png';
import '../../theme/colors.css'
export default function Logo() {
    return(
        <>
        <img src={Logo_Img} width={'30px'} height={'30px'} className="h-8 me-3" alt="Logo" />
        <p className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"style={{color: 'var(--icon-color)'}}>
            Fady.<span className="text-xl  dark:text-white" >Movies</span></p>

        </>
    )
}
