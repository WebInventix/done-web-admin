import { Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import card1 from '../../assets/card1.png'
import card2 from '../../assets/card2.png'
import card3 from '../../assets/card3.png'
import ButtonComp from './ButtonComp'
import { themeGray } from '../../utils/colorTheme'
import './Card.css';
import { IcBaselineStar, MaterialSymbolsPerson } from '../Icon'

export const Card = (props) => {

    const { src, data, onClick, height } = props

    return (
        <Stack position={"relative"} mb={1} p={1} alignItems={"center"} justifyContent={"center"}>
            <Stack width={300}>
                <img style={{ objectFit: "cover", width: "100%", borderRadius: 20, height: height ? height : 400 }} src={src} />
            </Stack>
            <Stack position={"absolute"} bottom={8} width={300} className='cardsec'>
                {/* <Typography>Mișcător</Typography>
                    <Typography>497 Profesionişti</Typography>
                    <Typography>4.8 (400 Recenzii verificate)</Typography>
                    <ButtonComp label="OBȚINEȚI COTAȚII"/> */}
                <div className={"info"}>
                    <h4>{data?.title}</h4>
                    <p>
                        <MaterialSymbolsPerson />
                        {data?.work}
                    </p>
                    <p>
                        <IcBaselineStar />

                        {data?.rating}
                    </p>
                    <ButtonComp onClick={onClick} className={"cardinfobtn"} label="OBȚINEȚI COTAȚII" />
                </div>
            </Stack>
        </Stack>
    )
}
