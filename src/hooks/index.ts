import { useState, useCallback, useEffect, useRef } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { isAddress } from '../utils'
import copy from 'copy-to-clipboard'

export function useColor(tokenAddress, token) {
  const [color, setColor] = useState('#2172E5')
  if (tokenAddress) {

    // const path = `https://faucet.crcchainpro.com/images/tokens/${isAddress(
    //   tokenAddress
    // )}.png`
    let path = ''
    switch (tokenAddress) {
      // USDT
      case '0x86711599d5eb968b3c67433e65783d18eff4476e':
        path = 'https://wallet-n3.crcchainpro.com/image/USDT.png';
        break;
      // CRB
      case '0x36edbc71a6416ba36b9b16bbbaf96cd80783fc9d':
        path = 'https://wallet-n3.crcchainpro.com/image/CRB.png';
        break;
      // USDB
      case '0x9ae1583096f48effefad417bdd9ca9104d87adf2':
        path = 'https://wallet-n3.crcchainpro.com/image/USDB.png';
        break;
      // SHD
      case '0xb9ac113c402a7c2fec9baba7ab799b825b2fd8e7':
        path = 'https://wallet-n3.crcchainpro.com/image/SHD.png';
        break;
      default:
        console.log('tokenAddress', tokenAddress);
        path = '';
    }

    if (path) {
      Vibrant.from(path).getPalette((err, palette) => {
        if (palette && palette.Vibrant) {
          let detectedHex = palette.Vibrant.hex
          let AAscore = hex(detectedHex, '#FFF')
          while (AAscore < 3) {
            detectedHex = shade(0.005, detectedHex)
            AAscore = hex(detectedHex, '#FFF')
          }
          if (token === 'DAI') {
            setColor('#FAAB14')
          } else {
            setColor(detectedHex)
          }
        }
      })
    }
  }
  return color
}

export function useCopyClipboard(timeout = 500) {
  const [isCopied, setIsCopied] = useState(false)

  const staticCopy = useCallback((text) => {
    const didCopy = copy(text)
    setIsCopied(didCopy)
  }, [])

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return () => {
        clearTimeout(hide)
      }
    }
  }, [isCopied, setIsCopied, timeout])

  return [isCopied, staticCopy]
}

export const useOutsideClick = (ref, ref2, callback) => {
  const handleClick = (e) => {
    if (ref.current && ref.current && !ref2.current) {
      callback(true)
    } else if (ref.current && !ref.current.contains(e.target) && ref2.current && !ref2.current.contains(e.target)) {
      callback(true)
    } else {
      callback(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default function useInterval(callback: () => void, delay: null | number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      const current = savedCallback.current
      current && current()
    }

    if (delay !== null) {
      tick()
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return
  }, [delay])
}
