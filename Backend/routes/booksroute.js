import express from "express";
import { Book } from "../models/bookModels.js";

const router =express.Router();
// Route for Save a new Book
router.post('/',async(req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all required fields: title,author,publishYear',
            })
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };
        const book=await Book.create(newBook);
        return res.status(201).send(book);
    } catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

// Route for Get all books from database
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({});
        return res.status(201).json({
            count:books.length,
            data:books          //structuring the data
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//route get one book

router.get('/:id',async(req,res)=>{
    try{
        const{id}=req.params
        const book=await Book.findById(id);
        return res.status(201).json(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//route to update an book
router.put('/:id',async(req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all required fields: title,author,publishYear',
            });
        }

        const{id}=req.params;
        const result=await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message:'Book updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//roue to delete
router.delete('/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message:'Book deletd successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

export default router;