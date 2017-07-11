'use strict';

import React from 'react';
import Spinner from './spinner.js';
import { Link } from 'react-router'

const pagination = 4;

const NewContent = React.createClass({

  getInitialState() {
    return {
      newStories: [],
      isLoading: true,
      isLoadingMore: false
    }
  },

  showLoader() {
    this.setState({
      isLoading: true
    });
  },

  hideLoader() {
    this.setState({
      isLoading: false
    });
  },

  // componentDidMount() {
  //   console.log('componentDidMount');
  //
  //
  //   this.getContentJson(0, pagination, false);
  // },

  getContentJson(startIndex, pagination, isLoadingMore) {
    console.log('getContentJson');

    console.log(startIndex);
    console.log(pagination);
    console.log(isLoadingMore);


    let sourceUrl = 'https://api.myjson.com/bins/1hbp2f';

    $.get(sourceUrl, function (response) {

      console.log('response:'+response);

      if (response && response.length == 0) {
        this.hideLoader();
        return;
      }

      for(let i = startIndex; i <= pagination; i++) {
        if (i == pagination) {

          if(this.isMounted()) this.hideLoader();

          if (this.isMounted() && isLoadingMore) this.setState({ isLoadingMore: false });

          this.loadMore(pagination);
          return false;
        }

        this.getContentData(response[i], pagination);
      }

    }.bind(this));
  },

  getContentData(id) {
    console.log('getContentData');

    let contentUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';

    $.get(contentUrl, function (response) {

      if (response.length == 0) {
        if (this.isMounted()) {
          this.hideLoader();
        }
        return;
      }

      let domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : '';

      response.domain = domain;

      this.setState({newStories : this.state.newStories.concat(response)});

    }.bind(this));
  },

  convertTime(time) {
    console.log('convertTime');
    let d = new Date();
    let currentTime = Math.floor(d.getTime() / 1000);
    let seconds = currentTime - time;

    // more that two days
    if (seconds > 2*24*3600) {
      return 'a few days ago';
    }

    // a day
    if (seconds > 24*3600) {
      return 'yesterday';
    }

    if (seconds > 3600) {
      return 'a few hours ago';
    }

    if (seconds > 1800) {
      return 'Half an hour ago';
    }

    if (seconds > 60) {
      return Math.floor(seconds/60) + ' minutes ago';
    }
  },

  loadMore(pagination) {
    console.log('loadMore');

    $(window).unbind('scroll');

    $(window).bind('scroll', function () {

      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
          let previousCount = pagination + 1;
          pagination = pagination + 11;

          this.setState({isLoadingMore : true}); //To show loader at the bottom

          this.getContentJson(previousCount, pagination, true);
      }
    }.bind(this));
  },

  changeMenu() {
   console.log('changeMenu');
    $('.menu li').removeClass('selected');
  },

  render() {
    console.log('render');
    var newStories = this.state.newStories.map((response, index) => {

      console.log('response'+response);
      console.log('index'+index);

      // let searchQuery = 'https://www.google.co.in/search?q=' + response.title;

      return (
        <div key={index}>
          <div className="content">
            <a className="title" target="_blank" href={response.url}>{response.title} </a>

            <div className={response.domain ? 'domain': 'hide'}> (<a href={'http://' + response.domain} title="Domain">{response.domain}</a>)</div>

            <div className="bottom-content">
              <span>{response.score} {(response.score > 1) ? ' points' : ' point'} </span>
              <span>by
                <Link onClick={this.changeMenu} className="author" to={'/user/' + response.by}>{response.by}</Link>
              </span>
              <span> | {this.convertTime(response.time)} </span>
              // <a href={searchQuery} target="_blank" className="search-web"> | <span>web</span></a>
            </div>
          </div>
        </div>
      )
    }, this);

    return (
      <div className="content-container">
        <div className={this.state.isLoading ? '': 'hide'}>
          <Spinner />
        </div>

        {newStories}
        {this.props.children}
        <div className={ this.state.isLoadingMore ? 'mtop50' : 'hide'}>
          <Spinner />
        </div>
      </div>
    )
  }
});

module.exports = NewContent;
