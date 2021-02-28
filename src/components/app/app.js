import React from 'react';
import { Button } from 'reactstrap';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
//import PostForm from '../forms';

import './app.css';
import '../app-header/app-header.css';
import '../post-add-form/post-add-form.css';
import '../post-list/post-list.css';
import '../post-list-item/post-list-item.css';
import '../search-panel/search-panel.css';

import styled from 'styled-components';
import { Component } from 'react';

// создаем компонент
const AppBlock = styled.div `
    margin: 0 auto;
    max-width: 950px;`

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Yesterday I watched "The Man from the Boulevard des Capucines"', important: false, like: false, id: "1"},
                {label: 'Today it is -40 frost outside', important: false, like: true, id: "2"},
                {label: 'Going to learn React.js', important: false, like: false, id: "3"},
                {label: 'Going to learn Nuxt.js', important: false, like: false, id: "4"},
                {label: 'Going to learn Vue.js', important: false, like: false, id: "5"}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 30;
    }

    // функция замены текущего state новым с учетом удаленного элемента
    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id); // сравниваем поступивший ID с ID элемента

            const before = data.slice(0, index); // первая часть массива
            const after = data.slice(index + 1); // вторая часть массива

            const newArr = [...before, ...after]; // массив без выбранного индекса

            // обновляем state
            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        // create
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        //помещаем в state
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            // обновляем state
            return {
                data: newArr
            }
        });
    }

    onToggleImportant(id) {

        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id ===id);
            const old = data[index];
            const newItem = {...old, important: !old.important};
            
            const before = data.slice(0, index); // первая часть массива
            const after = data.slice(index + 1); // вторая часть массива
            const newArr = [...before, newItem, ...after]; // вставка измененного newItem
            // обновляем state
            return {
                data: newArr
            }
        })
    }
    onToggleLiked(id) {

        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id ===id); // получаем и находим индекс поста
            // сохраняем найденный пост в переменную (пост до изменений)
            const old = data[index];
            // создаем новый объект, в который сохраняем все свойства старого + измененное свойство
            const newItem = {...old, like: !old.like };
            
            const before = data.slice(0, index); // первая часть массива
            const after = data.slice(index + 1); // вторая часть массива

            const newArr = [...before, newItem, ...after]; // вставка измененного newItem
            // обновляем state
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }
        // ищем значение {label} наших элементов и в них ищем искомый элемент
        return items.filter((elem) => {
            return elem.label.indexOf(term) > -1;
        });

    }

    onUpdateSearch(term) {
        this.setState({term: term})
    }

    filterPost (items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } 
        else if (filter === 'important') {
            return items.filter(item => item.important);
        }
        else {
            return items
        }
    }
    onFilterSelect(filter) {
        this.setState({filter: filter})
    }

    render() {
        const {data, term, filter} = this.state; //деструктурируем из state

        const liked = this.state.data.filter((elem, index) => elem.like).length; //кол-во постов с лайками
        const importanted = this.state.data.filter((elem, index) => elem.lmportant).length;
        const allPosts = this.state.data.length; // всего постов

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts}
                importanted={importanted}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts = {visiblePosts}
                 onDelete={this.deleteItem}
                 onToggleImportant= {this.onToggleImportant} // переключение state important
                 onToggleLiked= {this.onToggleLiked} // переключение state liked
                 />
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}
