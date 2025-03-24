import express from 'express';
import cors from 'cors';
import { Task } from '../components/TaskList';
import pg from 'pg';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config({path :"./src/backend/.env"});


const app = express();  
app.use(express.json());
app.use(cors());


//connecting to the Postgresql DataBase , todo_db , table todos
const db = new pg.Pool({
     user: "postgres",
     password: process.env.DB_PASSWORD,
     host: "localhost",
     port: Number(process.env.DB_PORT),
     database: "todo_db"
     });

//retrive all rows from the todos table ordered ASCENDING by id.
app.get('/', async(req, res) => {
   
    try{
        const data = await db.query('SELECT * FROM todos ORDER BY id ASC')
        res.json(data.rows);
    }catch(err : any){
        console.error('connection error', err.message)
    }
   
    
});

//Recive the new Task , sets a new date of creation , updates the database with a new row of a new task.
app.post('/api/add', async(req, res) => {
    try{
        const date =  moment().format('DD/MM/YYYY');
        
        const newTask = req.body[0];
        const result = await db.query('INSERT INTO todos (text,completed,datecreated) VALUES ($1, $2, $3) RETURNING *',[newTask,false,date])
        console.log("new task added with params of: ", result.rows)
        res.json(result.rows[0]);
    }catch(err : any){
        console.error(err.message)
    }
    
});
//Removes a task from the database by id number.
app.delete('/api/delete/:id', async(req,res) =>{
    try{
        const TaskToRemove : number = Number(req.params.id);
        const result = await db.query('DELETE FROM todos WHERE id=$1 RETURNING *',[TaskToRemove])
        res.json(result.rows)
    }catch(err:any){
        console.error(err.message)
    }
})
//Updates the given task by id number , to be completed or not completed accordingly to use clicks.
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
//If all tasks have been removed , The id which is Serial will reset to be indexed 1 from the first new task added.
app.put('/api/put', async(req,res) =>{
    try {
        const result = await db.query("SELECT setval('todos_id_seq', 1, false)")
        res.json(result)
    } catch (error : any) {
        console.error(error.message)
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




