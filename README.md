# PoetryMate
CS 260 Startup Project


## Description deliverable

### Elevator Pitch
There are a million tools to help writers improve their prose. But anyone composing poetry or song lyrics is stuck with relatively unsophisticated tools: there are rhyming dictionaries and thesauri to be found online, but not much else. PoetryMate will be a new tool that builds on previous capabilities. To find the perfect word, poets will be able to search any term, and then see words that are similar in either meaning (i.e., synonyms) or sound (i.e., rhymes). This will allow them to quickly sort through candidates to replace or be paired with their desired search term. Going a step further, PoetryMate will remember all of each user's searches and recommend words that they may find interesting in similar poetic works.  This new ensemble of linguistic tools will enhance the breadth, depth, accuracy, and efficiency of poets' lexical decisions. 

### Design
Each user will `login` to see his or her personalized `For You` page:
![Login](loginDesign.png)
![For You](foryouDesign.png)

Doing any search will take the user to a `Search Results` page
![Search](searchDesign.png)
![Search results](searchresultDesign.png)

Finally, the `History` page:
![History](historyDesign.png)



### Key features
- Secure login over HTTPS
- `Search` page: shows semantically and phonetically similar words (using thesaurus and phonetic encoding edit distance/rhyming dictionary)
- `History` page: shows past searches
- Clicking a word in `Search Results` or `History` performs a search with that word
- `For You` page: Shows recommended words, random word, and most searched words.
- Recommened words are the semantic and phonetically most similar words to the aggregation of your historically searched words



### Technologies
I will demonstrate the following required technologies:
- HTML will give the application its structure. There will be 5 pages total (as shown in [Design](Design) above), and links to all displayed on a side navbar.
- CSS will make the pages attractive and make the clickability of elements evident. The application will adapt to different screen sizes.
- Javascript will power login, search queries, and backend calls.
- Backend services will include:
  - login
  - wordlist (4MB) from [GitHub public repo](https://github.com/dwyl/english-words/blob/master/words_alpha.txt)
    - random word generator
  - thesaurus (18MB)  from [GitHub public repo](https://github.com/zaibacu/thesaurus/blob/master/en_thesaurus.jsonl)
  - phonetic transcriptions (3 MB) from [GitHub public repo](https://github.com/open-dict-data/ipa-dict/blob/master/data/en_US.txt)
    - Levenshtein edit distance calculator code [here](https://www.30secondsofcode.org/js/s/levenshtein-distance/)
  - database of past searches by user consulted by:
    - `History` page list of past queries
    - `For You` page list of recommended new words based on each specific user and based on all users
  - DB - stores users, past searches
  - Login - Register and login users, and store login credentials in database. Can continue as guest?
  - WebSocket - Real time updates to the `For You` and `History` pages
  - React - production builds will be done on react


## HTML Deliverable
I built the structure of PoetryMate in HTML
- **HTML pages** - structured all 5 pages for application: index.html (`Login`), foryou.html, history.html, search.html, searchResult.html
- **Links** - All pages except `Login` have links to all the other pages, except to `Search Results`, which can only be reached by the Search button from the `Search` page. `Login`'s Log in button links to `For You`
- **Text** - Placeholder for all future word data (from database and 3rd party calls). Headers and footers for all pages. 
- **Images** - Used an open source favicon image for browser attractiveness
- **Login** - Input boxes (one for email, one for password) and submit button for login
- **Database/WebSocket** - Placeholder data on `For You`, `History` and `Search Results` pages, which will dynamically update later



## CSS Deliverable
I styled the application, creating all relevant visual features for the end experience.
- **Header, footer, and main content** - Footer and header are banner-style elements with main content stacked in between.
- **Navigation elements** - Links are in the upper right corner, and are only underlined when moused over. Submit buttons are styled to theme.
- **Responsive to window resizing** - Using vw and vh as primary sizes took care of most resizing. For espcially small screen widths, the site name disappears.
- **Application elements** - Content is displayed in cards that divide up information. Blue and yellow theme colors help with foreground and background; so does box-shadows behind the content cards. Pages have animated transitions.
- **Application text content** - Found a nice font set and applied to all elements. Text contrasts correctly with background. Important text is larger/bolder/italic as appropriate.
- **Application images** - Pen emoji used as list bullet.