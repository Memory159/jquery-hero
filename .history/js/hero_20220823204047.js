$(function() {
    // 按下回车 把完整的数据 存储到本地存储里面
    // 存储的数据格式 var hero = [{title : "xxx"}]
    load();
    // 添加英雄
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() == "" || $(this).val() == " ") {
                alert("请输入英雄名");
            } else {
                $("h3").text("英雄列表");
                // 清空 ol 内容
                $("ol").empty();
                // 先读取本地存储原来的数据
                var local = getDate();
                // 把 local 数组进行更新数据 把最新的数据追加给 local 数组
                local.push({ title: $(this).val() });
                // 把这个数组 local  存储给本地存储  传递参数是为了把 local 传递给函数
                saveDate(local);
                // hero 本地存储数据渲染加载到页面
                load();
                // 清空 input 内容
                $(this).val("");
            }
        }
    });

    // 查找英雄
    $("#search").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() == "" || $(this).val() == " ") {
                alert("请输入英雄名");
            } else {
                // 修改标题
                $("h3").text("查找结果");
                // 把返回列表给显示出来
                $(".return").show();
                // 先读取本地存储原来的数据
                var data = getDate();
                var count = 0;
                $("ol, ul").empty();
                // 遍历数组
                $.each(data, function(i, n) {
                    if ($("#search").val() == n.title) {
                        // $("ul").empty();
                        $("ol").prepend("<li><img src = '../images/" + n.title + ".webp' alt = ''><div class = 'list-cont'><span>" + n.title + "</span></div><div class = 'small-del' id = " + i + "></div></li>")
                        count++;
                    }
                })
                $(".have").text("共" + count + "个英雄");
                // 清空 input 内容
                $("#search").val("");
            }
        }
    })

    // 添加返回列表
    $(".return").on("click", function() {
        // 刷新页面
        location.reload(true);
    });

    // 删除全部
    $(".del").click(function() {
        // 先获取本地存储
        var data = getDate();
        // 得到 data 的长度
        var index = data.length;
        // 删除数据 从第 0 个开始删，删除 index 个（数组的长度）
        data.splice(0, index);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("hero");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("hero", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        // 读取本地存储数据
        var data = getDate();
        // 遍历之前先要清空 ul 里面的元素内容
        $("ul").empty();
        var count = 0;
        // 遍历这个数据
        $.each(data, function(i, n) {
            $("ul").prepend("<li id = " + i + "><img src = '../images/" + n.title + ".webp' alt = ''><div class = 'list-cont'><span>" + n.title + "  </span> <input type='text' id='change' placeholder='' name='change' required='required' autocomplete='off' ></div><div class = 'small-del' id = " + i + "><img src = '../images/del.png' ></div></li>")
            count++;
        })
        $(".have").text("共" + count + "个英雄");

        // hero 删除单个操作
        $("li").on("click", ".small-del", function() {
            // 先获取本地存储
            var data = getDate();
            // 修改数据
            var index = $(this).attr("id"); // 获取自定义属性 得到索引号
            data.splice(index, 1);
            // 保存到本地存储
            saveDate(data);
            // 重新渲染页面
            load();
        })

        // 修改操作
        $("span").on("dblclick", function() {

            var index = $(this).parents("li").attr("id");
            $(this).hide();
            $(this).siblings("#change").show();
            $(this).siblings("#change").focus();
            // $("#change").focus(); 吗  
            $(this).siblings("#change").on("keydown", function(event) {
                if (event.keyCode === 13) {
                    var data = getDate();
                    data[index].title = $(this).val(); // 数组的 title 属性设置为输入的内容
                    // 保存到本地存储
                    saveDate(data);
                    // hero 本地存储数据渲染加载到页面
                    load();
                    // 清空 input 内容
                    $(this).val("");
                }
            })

        });
    }


})