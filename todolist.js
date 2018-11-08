var vm = new Vue({
    el:"#app",
    data:{
        todos:[
           
        ],
        btns:[
            {content:'全部',className:'home',isChecked:true,type:"all"},
            {content:'已完成',className:'check',isChecked:false,type:"checked"},
            {content:'未完成',className:'clock',isChecked:false,type:"unchecked"}
        ],
        // 默认初始化状态
        type:"all",
        contentType:"show",
        edit:""
    },
    methods:{
        // foot按钮点击时添加active,如果选中了，就添加active
       checkSetting:function(type){
        this.type = type;
        this.btns.forEach(function(item){
            if(item.type == type){
                item.isChecked = true;
            }else{
                item.isChecked = false;
            }
        })
       },
       //删除元素
       removeTodo:function(id){
            this.todos = this.todos.filter(function(item){
                return item.id !== id;
            })
       },
       //根据type判断各种type的个数    
       getLength:function(type){
           switch(type){
               case "all":
                    return this.todos.length;
               case "checked":
                    var length = 0;
                    this.todos.forEach(function(item){
                       if(item.isChecked) length++;
                    })
                    return length;
              case "unchecked":
                    var length = 0;
                    this.todos.forEach(function(item){
                        if(!item.isChecked) length++;
                    })
                    return length;
           }
       },
       //edit中添加todo
      addTodos:function(){
          var todo ={
              isChecked:false,
              content:this.edit,
              id:Date.now()
          }
          this.todos.push(todo);
          this.contentType = "show";
      },
      mounted:function(){
          var storage = LocalStorage.getItem("todolist") == "null" ? "[]" :localStorage
          .getItem("todolist");
          this.$data.todos = JSON.parse(storage);
      }

    },    
    computed:{
        getTodos:function(){
            switch(this.type){
                case "all":
                    return this.todos;
                case "checked":
                    return this.todos.filter(function(item){
                        return item.isChecked;
                    });
                case "unchecked":
                    return this.todos.filter(function(item){
                        return !item.isChecked;
                    })
            }
        },
        showedit:{
            set:function(value){
                this.edit = value;
            },
            get:function(){
                return "";
            }
        }
    },
    watch:{
        todos:{
            handler:function(val){
                localStorage.setItem("todolist",JSON.stringify(val));
            },
            deep:true
        }
    }
})