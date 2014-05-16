<ul id="employee-list">
  <div class="data-label"><strong>Employee Information</strong></div>
  {{#employees}}
  <li>{{employeeId}} - {{birthDate}} - <a id="{{id}}" class="employee-name" href="#">{{firstName}} {{lastName}}</a> - {{sex}} - {{startDate}}</li>
  {{/employees}}

  {{^employees}}
  <span>There is no result</span>
  {{/employees}}
</ul>
