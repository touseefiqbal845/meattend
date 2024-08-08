

import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import CheckboxIcon from '../../assets/icons/checkbox.svg';
import "./style.css";
import { PackageI } from "../../services/model";

interface ServiceCardProps {
    data: PackageI;
    onCardSelect?: () => void;
}

export default function ServiceCard({ data, onCardSelect = () => { } }: ServiceCardProps) {
    const getStyling = () => {
        if (data.isSelected) {
            return {
                borderRadius: "16px", border: "2px solid #FFC000", cursor: 'pointer'
            }
        }
        return {
            borderRadius: "16px", border: "2px solid #C7CADA", cursor: 'pointer'
        }
    }
    const onClickHandler = () => {
        onCardSelect();
    }

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                <Box
                    sx={{
                        width: '100%',
                        height: "100%",
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                        gap: 2,
                    }}
                    onClick={onClickHandler}
                >
                    <Card variant="outlined" sx={{ ...getStyling() }} >
                        <Typography
                            variant="h2"
                            fontWeight={800}
                            sx={{
                                fontSize: {
                                    xs: '15px',
                                    sm: '15px',
                                    md: '20px',
                                    lg: '20px',
                                    xl: '30px',
                                },
                                '@media (min-width: 1360px) and (max-width: 1500px)': {
                                    fontSize: {
                                        md: '20px',
                                        lg: '20px',
                                        sm: '15px',
                                    },
                                },
                                '@media (max-width: 1700px) and (min-width: 1500px)': {
                                    fontSize: '25px',
                                },
                                lineHeight: '50.2px',
                                paddingLeft: '16px',
                                paddingTop: '20px',
                            }}
                        >                                       
                         {data.package_name.length > 3 ? `${data.package_name.substring(0, 13)}...` : data.package_name}
                        </Typography>
                        <Divider className="divider" />
                        <Box display='flex' justifyContent="space-between" sx={{
                            paddingRight: data.isSelected ? '10px' : 0,
                            marginTop: "-15px"
                        }}>
                            <Typography
                                variant="h2"
                                fontWeight={600}
                                sx={{
                                    fontSize: {
                                        xs: '15px',
                                        sm: '15px',
                                        md: '20px',
                                        lg: '20px',
                                        xl: '30px',
                                    },
                                    '@media (min-width: 1360px) and (max-width: 1500px)': {
                                        fontSize: {
                                            md: '20px',
                                            lg: '20px',
                                            sm: '15px',
                                        },
                                    },
                                    '@media (max-width: 1700px) and (min-width: 1500px)': {
                                        fontSize: '25px',
                                    },
                                    lineHeight: '50.2px',
                                    paddingLeft: '16px',
                                    paddingTop: '20px',
                                }}
                            >
                                {data.currency} {data.package_cost}
                                <span className="package-text">/{data.interval}</span>
                            </Typography>
                            {data.isSelected && <img alt="check" src={CheckboxIcon} />}
                        </Box>

                        <Typography variant="h2" fontWeight={500} fontSize={14} lineHeight="20px" color="#a0a3b5" paddingLeft="16px" paddingBottom="16px" paddingRight="14px">
                            {data.description}
                        </Typography>
                    </Card>
                </Box>
            </Grid>

        </>

    );
}









