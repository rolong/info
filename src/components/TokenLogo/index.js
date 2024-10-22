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

  if (address?.toLowerCase() === '0xfd39d3cdf65a22aceedb0e647f9ea96b6a6be41e') {
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
