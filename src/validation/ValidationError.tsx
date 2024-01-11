

export const validationModel =(todos: {title:string , description:string } )=>{

    const errormessage:{title: string,description:string} = {
      title :"",
      description:""
    }
    if(!todos.title.trim()|| todos.title.length == 0 || todos.title.length <5|| todos.title.length > 25){
      errormessage.title="todos title must be between 5 and 25   char"
    }else if(!todos.description.trim() ||  todos.description.length == 0 ||todos.description.length <10 ||todos.description.length >85){
      errormessage.description="Todos description must be between 10 and 80 char"
    }
    return errormessage;

  }