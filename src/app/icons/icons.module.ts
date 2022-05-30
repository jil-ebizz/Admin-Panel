import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Camera, Heart, Github, Home, ArrowRight, Users, File, Bell, Grid, Maximize, LogIn, User, ArrowLeft, ChevronUp, AlignCenter } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

// Select some icons (use an object, not an array)
const icons = {
  Home,
  User,
  Users,
  File,
  Bell,
  Grid,
  Maximize,
  LogIn,
  ArrowRight,
  ArrowLeft,
  Camera,
  Heart,
  Github,
  AlignCenter,
  ChevronUp
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
