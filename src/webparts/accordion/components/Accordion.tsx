import * as React from 'react';
import './Accordion.module.scss';
import './../../styles/animations.css';
import { IAccordionProps } from './IAccordionProps';
import { IAccordionState } from './IAccordionState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Heroes } from './heroes';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



export default class Accordion extends React.Component<IAccordionProps, IAccordionState> {

  constructor(props: IAccordionProps) {
    super(props);
    const externalCSS = [
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css",
      "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
    ];
    externalCSS.forEach(css => {
      SPComponentLoader.loadCss(
        css
      );
    });
    this.state = {
      heroes: Heroes
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  private reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  private onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const heroes = this.reorder(
      this.state.heroes,
      result.source.index,
      result.destination.index
    );

    this.setState({
      heroes
    });
  }

  public render(): React.ReactElement<IAccordionProps> {
    return (
      <div className="container">
        <div className="row">
          {this.state.heroes.map((heroe, i) => (
            <div className="col-12">
              <div className="bounce-in-top" key={i}>
                <div className="card mb-4 shadow-sm">
                  <div className="row no-gutters">
                    <div className="col-4 bg-black d-flex align-items-center">
                      <div className="card-body-img">
                        {heroe.publisher === 'DC Comics' ?
                          <img className="w-100" src="https://i0.wp.com/comicsworthreading.com/wp-content/uploads/2017/12/marvel_logo.png?resize=235%2C210&ssl=1" alt="Marvel" />
                          :
                          <img className="w-100" src="http://comicbookcorps.com/wp-content/uploads/2018/01/DC-Comics-logo-banner-orange-metal.jpg" alt="Marvel" />
                        }
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">{heroe.alter_ego}</h4>
                      </div>
                      <div className="card-body">
                        <h2 className="card-title">{heroe.superhero}</h2>
                        <p className="m-0">{heroe.characters}</p>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-auto">
                            <i className={(heroe.isAlien ? 'fab fa-reddit-alien' : 'fas fa-user-circle')}></i>
                          </div>
                          <div className="col-auto">
                            <i className={'fas ' + (heroe.canFly ? 'fa-fighter-jet' : 'fa-walking')}></i>
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div >
    );
  }
}
