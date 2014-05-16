<ul id="salary-list">
  <div class="data-label"><strong>Salary Information - {{firstName}}</strong></div>
  {{#salaries}}
  <li>{{startOfSalary}} - {{endOfSalary}}: ${{salary}}</li>
  {{/salaries}}

  <canvas id="salary-chart"></canvas>
</ul>