import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from './layout/footer/footer';
import { Navbar } from './layout/navbar/navbar';
import { ContactSection } from './sections/contact/contact';
import { EducationSection } from './sections/education/education';
import { ExperienceSection } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { ProjectsSection } from './sections/projects/projects';
import { SkillsSection } from './sections/skills/skills';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, ExperienceSection, EducationSection, SkillsSection, ProjectsSection, ContactSection, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
