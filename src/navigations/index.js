
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';

import { LandingPage ,AboutUS,Favourites,LikeUs,RateUs,Share,MenuCategoriesPage} from '../container';

import DrawerContent from './drawer'
const AppStack = createStackNavigator({
    LandingPage: LandingPage,
    AboutUS:AboutUS,
    Favourites:Favourites,
    LikeUs:LikeUs,
    RateUs:RateUs,
    Share:Share,
    MenuCategoriesPage:MenuCategoriesPage


},
  {
     initialRouteName: 'MenuCategoriesPage'
  }
)


const DrawerStack = createDrawerNavigator(
    {
        Main: AppStack
    },
    {
        contentComponent: DrawerContent,
        // initialRouteName: 'LandingPage'
    }
);
export default createAppContainer(DrawerStack)
