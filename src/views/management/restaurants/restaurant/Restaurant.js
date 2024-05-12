import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react'

const Restaurant = () => {

  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getRestaurants = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listrestaurant'
      });
      const lstRestaurants = Object.keys(response.data).map(i=> response.data[i]);
      //console.log(lstRestaurants);
      setRestaurantData(lstRestaurants.flat());
    }

    getRestaurants();
  },[]);

  function handleCreateRestaurant (event){
    navigate('/restaurants/restaurantForm');
  }

  function handleEdit (restaurantId){
    navigate(`/restaurants/restaurantEditForm/${restaurantId}`);
  }

  const handleDisable = async(restaurantId) =>{
    try{
      var url = "http://localhost:1337/api/disablerestaurant/"+restaurantId;
      const response = await Axios.put(url);
      window.location.reload();
    }catch(e){
      console.log(e);
    }

  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'restaurantName'
    },{
      title:'NIT',
      dataIndex: 'restaurantNit'
    },{
      title:'Address',
      dataIndex: 'restaurantAddress'
    },{
      title:'Phone',
      dataIndex:'restaurantPhone'
    },{
      title:'city',
      dataIndex:'cityId'
    },{
      title:'Options',
      render:(restaurantId) =>(
        <div>
          <CButton color='primary' onClick={() => handleEdit(restaurantId)}>Edit</CButton>
          <CButton color='danger' onClick={() => handleDisable(restaurantId)}>Delete</CButton>
        </div>
      ),
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreateRestaurant}> New Restaurant </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key= {index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {restaurantData.map((restaurant, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}> 
                  {column.title === 'Options' ? column.render(restaurant.restaurantId) : restaurant[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
          
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Restaurant
