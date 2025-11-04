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
      case '0xda53d50a674166732d01bd1002aba015b785a649':
        path = 'https://wallet-n9.cncchainpro.com/image/USDT.png';
        break;
      // BNB
      case '0x1e334f25dfda2bf8dc1d851d7be8e52ca2d5b275':
        path = 'https://wallet-n9.cncchainpro.com/image/BNB.png';
        break;
      // GDO
      case '0x1fcdaa3c3cd65126cfd58117aecd0f6d76b824b9':
        path = 'https://wallet-n9.cncchainpro.com/image/GDO.png';
        break;
      // GDB
      case '0xc9a34424393d60a8cdda49f771e3fce17d538e9c':
        path = 'https://wallet-n9.cncchainpro.com/image/GDB.png';
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
