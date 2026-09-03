import { useState, useEffect } from 'react'

function App() {
 useEffect(()=>{
  async function testConnection(){
    // if getting error while retrieving a value means coonection no successful
    const {error} = await supabase
    .from("workouts")
    .select("id")
    .limit(1);

    if(error){
      console.error("Supabase connection failed: ", error);
      return;
    }
    console.log("Supabase connection successful");

    testConnection();
  }
 },[])

  return (
    <>
    <main>
      <h1>Repwise - an AI Workout Assistant</h1>
    </main>
    </>
  )
}

export default App
