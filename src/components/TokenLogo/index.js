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

  if (address?.toLowerCase() === '0x25dfa1b0a4f5c69ce3e9383a1d80f9082a3091dd') {
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
    // VGL-USDT
    case '0x7946ac4a9f8a276bdaae2d4c88211fdd2bbd182e':
      path = 'https://modoscan.oss-cn-hongkong.aliyuncs.com/USDT.png';
      break;
    case '0x1778f92de8b6eb8ac63ccab8e43695c0b9c1816b':
      path = 'https://asianmeta.oss-ap-southeast-1.aliyuncs.com/VGL.png';
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
