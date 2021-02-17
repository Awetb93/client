
import { Grid, TextField, Button, } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form"
import { gql, useQuery,useMutation } from "@apollo/client"
import Post from "./Post";
export const getdata = gql`{
  posts{
    post createdAt id user{
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
}`

const AddPostMutation = gql`
mutation($post:String!){
    addPost(post:$post){
    post
  }
}

`
export default function Home() {

  const methods = useForm()
  const { data} = useQuery(getdata)

  const[addPost]=useMutation(AddPostMutation)
  const {control,handleSubmit,reset}=methods
  const user = JSON.parse(localStorage.getItem("user"))
    const onsubmit = val => {
        addPost({ variables: {...val },refetchQueries:[{query:getdata}] })
        reset()
  }



    return (
        <>
       <Grid  container style={{marginTop:"20px"}} >
              <Grid item sm={4}></Grid>
                <Grid item sm={6}>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="profile-circle">
                           {user.name[0]} 
                        </div>
                        <Controller as={TextField} label={`what is in your mind ${user.name}?`} variant="outlined" control={control} name="post" defaultValue="" style={{ width: "100%" }} />
                        <div className="btn-container">
                       <Button className="btn" type="submit">Post</Button>
                        </div>
                    </form>
              </Grid>
              <Grid item sm={2}></Grid>
            </Grid>
            
        <Grid  container style={{marginTop:"20px"}} >
                <Grid item sm={4}></Grid>
                <Grid item sm={6}><Post posts={data}/></Grid>
                  <Grid item sm={2}></Grid>
            </Grid>
            </>
    )
}
