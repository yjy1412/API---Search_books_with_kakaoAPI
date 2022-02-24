$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    // 새로운 검색 요청 시, 기존 컨텐츠 제거
    const contents = $(".container").children();
    contents.remove();

    // 1. input id를 통한 접근
    const inputData = $("#query").val();
    // 2. input name을 통한 접근, <form> submit 전송시 사용.
    const inputDataWithName = $("input[name=q]").val();
    const container = $(".container");

    $.ajax({
      method: "get",
      url: "https://dapi.kakao.com/v3/search/book?target=title",
      data: { query: inputData },
      headers: { Authorization: "KakaoAK b8914b3fad54a304898032f492296a4f" },
      error: function (xhr, status, error) {
        alert(error);
      },
      success: function (json) {
        const documents = json.documents;
        console.log(documents);
        // documents 최신 발행(datetime)순으로 정렬
        documents.sort((a, b) => {
          return new Date(b.datetime) - new Date(a.datetime);
        });

        documents.forEach((document, idx) => {
          // 컨텐츠 wraping
          container.append("<section class=content id=content"+idx+"></section>");
          const book = $("#content"+idx);

          const { authors, title, contents, sale_price, thumbnail, datetime } = document;
          // authors의 타입은 배열임.
          const authorsToString = authors.join(', ');
          book.append("<img src=" + thumbnail + ">");
          book.append("<strong>" + title + "</strong>");
          book.append("<p>" + contents + "</p>");
          book.append("<p>" + sale_price + "</p>");
          book.append("<p>" + authorsToString + "</p>");
          book.append("<p>" + datetime + "</p>");
        })
      }
    })
  })
})




