/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
window.onload = () => {
    let api_key = "apikey=9e810dd3";
    let current_page = 1; // ������� ��������
    let max_pages = 0;
    function Href(page, title, type, flag) {
        return flag === true ? `http://www.omdbapi.com/?${api_key}&s=${title}&type=${type}&page=${page}` :
            `http://www.omdbapi.com/?${api_key}&i=${title}&plot=full`;
    }
    function Page(max_page) {
        return !Number.isInteger(max_page / 10) ? (Math.trunc(max_page / 10) + 1) : max_page / 10;
    }
    function RemoveChildren(elem) {
        $(elem).children().remove();
    }
    function RenderPage(page) {
        $.get(Href(page, $("#title").val(), $("#type option:selected").val(), true), function (data) {
            RemoveChildren("#mov_div");
            max_pages = Page(data.totalResults);
            console.log("totres" + data.totalResults);
            if (data.Error != "Movie not found!") {
                for (let i = 0; i < data.Search.length; i++) {
                    $('#mov_div').append(row(data, i));
                }
            }
            else {
                $('#mov_div').append('<div id="div_nf">Movie not found!</div>');
            }
            $('.a_bt').on('click', function () {
                RemoveChildren("#dv1n");
                $.ajax({
                    type: 'GET', dataType: 'json',
                    url: Href(page, $(this).val(), "", false),
                    success: function (data) { $('#dv1n').append(film_info(data)); }
                });
            });
        });
    }
    function RenderPagination(parent, ip, pages, current) {
        RemoveChildren("#div_5");
        for (let i = ip; i < pages; i++) { // ������ "������" �� �������� i ����� ������������ ��������������� (ID)
            let item = $('<span></span>');
            item.addClass('link');
            if (i === current)
                item.addClass('active'); // ���� ID ����� ������� ��������, �� �������� ������ 
            item.attr("data-page", i);
            item.text(i); // ������� ����� ��������
            parent.append(item);
        }
    }
    $('#bt1').on('click', function () {
        current_page = 1;
        RenderPage(current_page); // ��������� ������ ��� ������� ��������
        RenderPagination($('#div_5'), 1, 3 + 1, current_page);
        $('#div_5').on('click', function (e) {
            let target = e.target.closest('.link');
            if (target) {
                let page = +target.getAttribute('data-page'); // �������� ID ����� �������� 
                current_page = page; // �������������� �������� ������� ��������
                let left_num = page - 1, right_num = page + 2;
                if (page == max_pages) {
                    right_num = page + 1;
                    left_num = page - 2;
                }
                if (left_num == 0) {
                    left_num = 1;
                    right_num = 4;
                }
                RenderPage(current_page); // � ������ ���������� 
                RenderPagination($('#div_5'), left_num, right_num, current_page);
            }
        });
    });
    let row = function (data, i) {
        return '<div class="div3" >' + '<img class="img" src = "' + data.Search[i].Poster + '" ><div class="div4" ><h2>' +
            data.Search[i].Title + '</h2><p class="p1"> Year: ' + data.Search[i].Year + ' </p>' +
            '<button class="a_bt" value="' + data.Search[i].imdbID + '" > Details </button></div></div>';
    };
    let film_info = function (data) {
        return '<div class="div2_n"><br/><h3 class="h3" >' + data.Title + '</h3>' +
            '<div class= "div3_n"><img class="img2" src="' + data.Poster + '" width = "300" />' +
            '<h2 class="h2 shadow" > Genre: <p class="p2" > ' + data.Genre + ' </p></h2>' +
            '<h2 class="h2n shadow" > Director:' + '<p class="p1n">' + data.Director + '</p> </h2>' +
            '<h2 class="h2n shadow" > Actors:' + '<p class="p1n_n p1n">' + data.Actors + '</p> </h2>' +
            '<h2 class="h2 shadow" > Country: <p class="p3_n p3" > ' + data.Country + ' </p></h2>' +
            '<h2 class="h2 shadow" > Year: <p class="p3" > ' + data.Year + ' </p></h2>' +
            '<h2 class="h2 shadow" > Runtime: <p class="p3_n p3" > ' + data.Runtime + ' </p></h2>' +
            '<p class="shadow p4" > ' + data.Plot + ' </p></div><br/></div>';
    };
};
//# sourceMappingURL=app.js.map