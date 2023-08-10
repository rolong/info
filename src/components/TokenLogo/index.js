import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils/index.js'
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

  if (address?.toLowerCase() === '0xe2cc70827823bc67f0577776a8adbbd00f56356a') {
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
    // MOD-USDT
    case '0x326778dfe5a79941487bd0a3c8b4de4dc773359d':
      path = 'https://modoscan.oss-cn-hongkong.aliyuncs.com/USDT.png';
      break;
    // MOD-PECO
    case '0x20209a0404b22384f65fff7a6539c5a98603b375':
      path = 'https://modoscan.oss-cn-hongkong.aliyuncs.com/MOD.png';
      break;
    default:
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
