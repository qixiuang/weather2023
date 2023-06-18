import { Card, Grid } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as HumidityIcon1 } from '../../assets/humidity-svgrepo-com.svg';
import { ReactComponent as TemperatureIcon } from '../../assets/temperature-quarter-svgrepo-com.svg';

export default function Weather(currCityData:any) {

	return (
        
        <div >
            {currCityData.cityData.main && (
                <Card style={{ textAlign: 'center', marginTop: '7%', marginBottom: '7%' }}>
                    <h4>Current Weather for {currCityData.cityData.name}</h4>
                    <h5>
                        <div>
                        <TemperatureIcon/>
                        {currCityData.cityData.main.temp}
                        </div>
                        </h5>
                    <div>
                        <div>
                            <HumidityIcon1 /> Humidity
                        </div>
                        <span>{currCityData.cityData.main.humidity}%</span>
                    </div>
                    <div>
                    <div>
                        </div>
                        <span>feels like {currCityData.cityData.main.feels_like}%</span>
                    </div>
                </Card>
            )}
      </div>
	);
}