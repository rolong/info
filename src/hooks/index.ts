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
      case '0x06cdc6505580f2894cd89ec3b11df37f78ac9d4f':
        path = 'https://wallet-n8.cncchainpro.com/image/USDT.png';
        break;
      // BOPC
      case '0x8fec64b18576ecf73fc80a3d2f0a7118afa00133':
        path = 'https://wallet-n8.cncchainpro.com/image/BOPC.png';
        break;
      // GOD
      case '0xc62a2df7880956086b18669d088c286e94d2cf03':
        path = 'https://wallet-n8.cncchainpro.com/image/GOD.png';
        break;
      // OPCB
      case '0x1ae44fc7da864ec47474e537d9c13b85d4b78330':
        path = 'https://wallet-n8.cncchainpro.com/image/OPCB.png';
        break;
      // OPE
      case '0xf449e992bac913def486108ad27c50bfc8e26c12':
        path = 'https://wallet-n8.cncchainpro.com/image/OPE.png';
        break;
      // HASH
      case '0xd641baa8ac78c29267b80a053b7a4c4ff152ce7a':
        path = 'https://wallet-n8.cncchainpro.com/image/HASH.png';
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
