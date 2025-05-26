import IdeasApi from "../services/ideasApi";

class IdeaList {
    constructor() {
       this._ideaListEl = document.querySelector('#idea-list'); 
       this._ideas = [
//         {
//             id: 1,
//             text: 'Idea 1',
//             tag: 'Business',
//             username: 'John',
//             date: '02/01/2023'
//         },
//    {
//             id: 2,
//             text: 'Idea 2',
//             tag: 'Technology',
//             username: 'Jill',
//             date: '02/01/2023'
//         },
       ];
       this.getIdeas();

       this._validTags = new Set();
       this._validTags.add('technology');
       this._validTags.add('software');
       this._validTags.add('business');
       this._validTags.add('technology');
       this._validTags.add('education');
       this._validTags.add('health');
       this._validTags.add('inventions');
    }

addEventListeners() {
    this._ideaListEl.addEventListener('click',(e) => {
        if (e.target.classList.contains('fa-times')) {
            e.stopImmediatePropagation();
const ideaId = e.target.parentElement.parentElement.dataset.id;
this.deleteIdea(ideaId);
        }
    })
}

async getIdeas() {
try {
const res = await IdeasApi.getIdeas();
this._ideas = res.data.data;
this.render();
} catch (error) {
    console.log(error);
}
}

async deleteIdea(ideaId) {
    const username = localStorage.getItem('username');
    console.log('Local username:', username);

    const idea = this._ideas.find((idea) => idea._id === ideaId);
    console.log('Idea owner username:', idea?.username);
    
    try {
//delete from server
const res = await IdeasApi.deleteIdea(ideaId);
this._ideas.filter((idea) => idea._id !== ideaId);
this.getIdeas();
    } catch (error) {
        alert('You can not delete this resource');
    }
}
// getTagClass(tag) {
//         tag = tag.toLowerCase();
//         let tagClass = '';
//         if (this._validTags.has(tag)) {
//             tagClass = `tag-${tag}`;
//         } else {
//             tagClass = '';
//         } return tagClass;
//     }

addIdeaToList(idea) {
this._ideas.push(idea);
this.render();
}

    getTagClass(tag) {
    if (!tag) return ''; // Return an empty string if tag is missing or undefined
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
        tagClass = `tag-${tag}`;
    }
    return tagClass;
}


render() {
    console.log('Rendering ideas...');
    this._ideaListEl.innerHTML = this._ideas
        .map((idea) => {
            const tagClass = this.getTagClass(idea.tag || '');  // Default to empty string if tag is missing
            const tagText = (idea.tag || 'No Tag').toUpperCase();  // Default to 'No Tag' if missing
            return `
                <div class="card" data-id="${idea._id}"> 
                    <button class="delete"><i class="fas fa-times"></i></button>
                    <h3>${idea.text}</h3>
                    <p class="tag ${tagClass}">${tagText}</p>
                    <p>
                        Posted on <span class="date">${idea.date}</span> by
                        <span class="author">${idea.username}</span>
                    </p>
                </div>
            `;
        })
        .join('');
        this.addEventListeners();
}
}
export default IdeaList;

//---------------------

