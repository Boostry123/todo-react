import express from 'express';
// import db from './db';
import cors from 'cors';
import { Task } from '../components/TaskList';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();  
app.use(express.json());
app.use(cors());



const db = new pg.Pool({
     user: "postgres",
     password: "6450",
     host: "localhost",
     port: 5432,
     database: "todo_db"
     });


app.get('/', async(req, res) => {
   
    try{
        const data = await db.query('SELECT * FROM todos')
        res.json(data.rows);
    }catch(err : any){
        console.error('connection error', err.message)
    }
   
    
});

app.post('/api/add', async(req, res) => {
    try{
        const newTask = req.body[0];
        const result = await db.query('INSERT INTO todos (text,completed) VALUES ($1, $2) RETURNING *',[newTask,false])
        console.log("new task added with params of: ", result.rows)
        res.json(result.rows[0]);
    }catch(err : any){
        console.error(err.message)
    }
    
});

app.delete('/api/delete', async(req,res) =>{
    try{
        const TaskToRemove : number = req.body.params;
        const result = await db.query('DELETE FROM todos WHERE id=$1 RETURNING *',[TaskToRemove])
        console.log("The Id: ",TaskToRemove," have been removed")
        res.json(result)
    }catch(err:any){
        console.error(err.message)
    }
})
app.patch('/api/patch', async(req,res) =>{
    try{
        const TaskToPatch : number = req.body.params;
        const result = await db.query('UPDATE todos SET completed = NOT completed WHERE id = $1',[TaskToPatch])
        console.log("The Id: ",TaskToPatch," have been marked Complete/Not Complete")
        res.json(result)
    }catch(err:any){
        console.error(err.message)
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




