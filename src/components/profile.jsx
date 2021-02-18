import { useParams, Link } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import { Grid } from "@material-ui/core"
import  Post from "./Post"
const GetData = gql`
    query($id:ID!){
        user(id:$id){
         posts{
    post  picUrl,picName createdAt id user{
      name,id 
    }
    comments{
        comment createdAt user{
          name id
        }
      }
       likes{
      owner
    }
  }   
        }
    }

`
export default function Profile() {
    const { id } = useParams()
    const { data } = useQuery(GetData, { variables: { id } })
    if (data) {
      console.log(data.user)  
    }


    return (
       <Grid  container style={{marginTop:"20px"}} >
            <Grid item sm={4}></Grid>
            {data && <Grid item sm={6}><Post posts={data.user} /></Grid>}
                  <Grid item sm={2}></Grid>
            </Grid>
    )
}
