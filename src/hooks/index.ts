import { useState, useCallback, useEffect, useRef } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { isAddress } from '../utils'
import copy from 'copy-to-clipboard'

export function useColor(tokenAddress, token) {
  const [color, setColor] = useState('#2172E5')
  if (tokenAddress) {

    // const path = `https://faucet.cncchainpro.com/images/tokens/${isAddress(
    //   tokenAddress
    // )}.png`
    let path = ''
    switch (tokenAddress) {
      // USDT
      case '0x7717a5c2617cecebeaf05829c451295d088b1db7':
        path = 'https://wallet-n6.cncchainpro.com/image/USDT.png';
        break;
      // GDO
      case '0x0507876aad6e9b8992cdd7101588173d9ba673ef':
        path = 'https://wallet-n6.cncchainpro.com/image/GDO.png';
        break;
      // GDB
      case '0x78e7d1605c1ab655fa0be1f0865894d1c241dd09':
        path = 'https://wallet-n6.cncchainpro.com/image/GDB.png';
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
