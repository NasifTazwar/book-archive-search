
// Function for searchbox
const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    //clearing data
    searchField.value ='';
    document.getElementById('resultNotFound').style.display ='none';
    document.getElementById('writeSomething').style.display ='none';
    //getting data
    if(searchText === ''){
        document.getElementById('writeSomething').style.display ='block';
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>displaySearchResult(data,data.docs.slice(0,25)))
        
    }
}

//Displaying Data by data and data.docs parameter
const displaySearchResult =(data,docs) =>{
    const searchResult = document.getElementById('search-result');

    //clearing data
    searchResult.textContent ='';
    document.getElementById('totalResults').innerText='';
    document.getElementById('resultNotFound').style.display ='none';
    if(docs.length === 0){
        document.getElementById('resultNotFound').style.display ='block';
    }
    else{
        document.getElementById('totalResults').innerText=`
            Showing ${docs.length} of ${data.numFound} number of books
        `
        docs.forEach(doc =>{
            console.log(doc);
            const div = document.createElement('div');
            div.classList.add('col','rounded','show-effects');
            div.innerHTML=`
                <div class="card h-100 text-dark">
                        <img style="height:315px" src='https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg' class="card-img-top" alt="...">
                    <div class="card-body mt-2">
                        <h3 class="card-title"><strong>${doc.title}</strong></h4>
                        <h5 class="card-text">Written by,  ${doc.author_name?.[0]}</h6>
                        <h6 class="card-text">Published by, ${doc.publisher?.[0]}</h6>
                    </div>
                    <div class="card-footer">
                             <small class="text-muted">First Published In ${doc.first_publish_year}</small>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        })
    }
    
}