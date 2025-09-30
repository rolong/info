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

  if (address?.toLowerCase() === '0x2171477d3c324dcced1bcc0cb5e3392f0708f302') {
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
      console.log('address', address);
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
