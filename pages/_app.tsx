import MainLayout from "../layouts/MainLayout";
import { Roboto } from '@next/font/google'
import type { AppProps } from 'next/app'
import '../styles/globals.css'


const roboto = Roboto({weight: '400',  subsets: ['latin'] })

function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout className={roboto.className}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default App