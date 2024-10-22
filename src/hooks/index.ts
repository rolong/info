import { useState, useCallback, useEffect, useRef } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { isAddress } from '../utils'
import copy from 'copy-to-clipboard'

export function useColor(tokenAddress, token) {
  const [color, setColor] = useState('#2172E5')
  if (tokenAddress) {

    // const path = `https://faucet./images/tokens/${isAddress(
    //   tokenAddress
    // )}.png`
    let path = ''
    switch (tokenAddress) {
      case '0xd61fffe4d99a9289750aed72a1eefbdbd741c191':
        path = 'https://wallet.cncscan.com/image/USDT.png';
        break;
      case '0xfd39d3cdf65a22aceedb0e647f9ea96b6a6be41e':
        path = 'https://wallet.cncscan.com/image/CNC.png';
        break;
      case '0xbe869ff11bb3fad03bc3b3499bd400557a410dc3':
        path = 'https://wallet.cncscan.com/image/HW.png';
        break;
      case '0x059c016b88e07b8e266419c95e6c793f44f5a489':
        path = 'https://wallet.cncscan.com/image/BWA.png';
        break;
      case '0x02869c1d9123cf20c2f97d69dd38ce2245919464':
        path = 'https://wallet.cncscan.com/image/MER.png';
        break;
      case '0x4b6d3a2862915e1d17d604374fc95bb6b78a9e55':
        path = 'https://wallet.cncscan.com/image/OMC.png';
        break;
      case '0xba65e997e5d7e3e77c0fa8eb78b660cc4bf90d3f':
        path = 'https://wallet.cncscan.com/image/FAC.png';
        break;
      case '0x73f844552bcf4402aa51fc4371107749a4eb8dd0':
        path = 'https://wallet.cncscan.com/image/CBR.png';
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
