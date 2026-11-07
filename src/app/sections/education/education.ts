import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEGREE, TRAINING } from '../../data/education';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading';
import { Spotlight } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-education',
  imports: [Reveal, SectionHeading, Spotlight],
  templateUrl: './education.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationSection {
  protected readonly degree = DEGREE;
  protected readonly training = TRAINING;
}
