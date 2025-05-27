import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { isAddress } from '../../utils/index.js'
import EthereumLogo from '../../assets/logo.png'
import none from '../../assets/none.png'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  // TODO 2023年2月24日16:55:47 注释,  不知道什么意思
  // useEffect(() => {
  //   setError(false)
  // }, [address])
  // if (error || BAD_IMAGES[address]) {
  //   return (
  //     <Inline>
  //       <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
  //         🤔
  //       </span>
  //     </Inline>
  //   )
  // }

  // hard coded fixes for trust wallet api issues
  if (address?.toLowerCase() === '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb') {
    address = '0x42456d7084eacf4083f1140d3229471bba2949a8'
  }

  if (address?.toLowerCase() === '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f') {
    address = '0xc011a72400e58ecd99ee497cf89e3775d4bd732f'
  }

  if (address?.toLowerCase() === '0x872e071a2165f7bd4923dda4e2a8a425bb86b4ca') {
    return (
      <StyledEthereumLogo size={size} {...rest}>
        <img
          src={EthereumLogo}
          style={{
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
            borderRadius: '24px',
          }}
          alt=""
        />
      </StyledEthereumLogo>
    )
  }

  let path = ''

  switch (address) {
    // CNC-USDT
    case '0xa117436cd703644044c15568b9eaa2eb2f9ac79a':
      path = 'https://wallet.cncscan.com/image/USDT.png';
      break;
    case '0x60a774336ffe329401a70312d43711fce095c8ea':
      path = 'https://wallet-n4.cncscan.com/image/BLD.png';
      break;
    case '0x872e071a2165f7bd4923dda4e2a8a425bb86b4ca':
      path = 'https://wallet.cncscan.com/image/CNC.png';
      break;
    case '0xbe869ff11bb3fad03bc3b3499bd400557a410dc3':
      path = 'https://wallet.cncscan.com/image/HW.png';
      break;
    case '0x8d0cfefadc98f031a7edb42c1d6e6673806d94fc':
      path = 'https://wallet.cncscan.com/image/SMP.png';
      break;
    case '0xe0ef7fc7a44c8a8bcb002dd743220cd3d3cb4746':
      path = 'https://wallet.cncscan.com/image/BWA.png';
      break;
    case '0x02869c1d9123cf20c2f97d69dd38ce2245919464':
      path = 'https://wallet.cncscan.com/image/MER.png';
      break;
    case '0x02869c1d9123cf20c2f97d69dd38ce2245919464':
      path = 'https://wallet.cncscan.com/image/OMC.png';
      break;
    case '0x4b6d3a2862915e1d17d604374fc95bb6b78a9e55':
      path = 'https://wallet.cncscan.com/image/FAC.png';
      break;
    case '0xb969f7bbd484e099b3d23277afb18727fcd8f4dd':
      path = 'https://wallet.cncscan.com/image/CBR.png';
      break;
    case '0x69be9ea4ff749707da64321fe337476bea5a1fff':
      path = 'https://wallet-n8.cncscan.com/image/RDC.png';
      break;
    default:
      // console.log("Need TokenLogo:", address);
      path = none;
  }

  // const path = `https://faucet.oceanpchain.com/images/tokens/${isAddress(
  //   address
  // )}.png`

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
